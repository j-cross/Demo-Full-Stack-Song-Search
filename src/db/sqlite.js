const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = './src/db/chinook.db';

let db;

/**
 * Initialize the database.
 *
 */
function init() {
	const dirName = require('path').dirname(location);
	if (!fs.existsSync(dirName)) {
		fs.mkdirSync(dirName, { recursive: true });
	}

	return new Promise((acc, rej) => {
		db = new sqlite3.Database(location, err => {
			if (err) return rej(err);

			if (process.env.NODE_ENV !== 'test')
				console.log(`Using sqlite database at ${location}`);

			acc();
		});
	});
}

/**
 * Gracefully close the database
 *
 */
async function teardown() {
	return new Promise((acc, rej) => {
		db.close(err => {
			if (err) rej(err);
			else acc();
		});
	});
}

/**
 * Returns an array of songs that include the parameter in the title.
 *
 * @param {string} q The string to query.
 * @return [{Name: string, 
 * 					Composer: string
 * 					Milliseconds:number}] 
 * 					An array of objects with a the song's name, composer, and length in milliseconds
 */
async function searchTracks(q) {
	return new Promise((acc, rej) => {
		let sql = `SELECT DISTINCT Name, Composer, Milliseconds FROM tracks
		WHERE name LIKE ?
		ORDER BY name`;

		db.all(sql, ['%'+q+'%'], (err, rows) => {
			if (err) return rej(err);
			acc(rows);
		});
	});
}

/**
 * Returns an array of all songs in the database.
 *
 * @return [{Name: string, 
 * 					Composer: string
 * 					Milliseconds:number}] 
 * 					An array of objects with a the song's name, composer, and length in milliseconds
 */
async function getTracks(id) {
	return new Promise((acc, rej) => {
		db.all('SELECT Name, Composer, Milliseconds FROM tracks', (err, rows) => {
			if (err) return rej(err);
			acc(rows);
		});
	});
}

module.exports = {
	init,
	teardown,
	searchTracks,
	getTracks
};
