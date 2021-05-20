const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = './src/db/chinook.db';

let db;

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

async function teardown() {
	return new Promise((acc, rej) => {
		db.close(err => {
			if (err) rej(err);
			else acc();
		});
	});
}

async function searchTracks(q) {
	return new Promise((acc, rej) => {
		let sql = `SELECT DISTINCT Name name FROM tracks
		WHERE name LIKE ?
		ORDER BY name`;

		db.all(sql, ['%'+q+'%'], (err, rows) => {
			if (err) return rej(err);
			acc(rows);
		});
	});
}

async function getTracks(id) {
	return new Promise((acc, rej) => {
		db.all('SELECT trackid, name FROM tracks', (err, rows) => {
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
