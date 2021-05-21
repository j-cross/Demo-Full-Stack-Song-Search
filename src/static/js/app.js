function App() {
	const { Container, Row, Col } = ReactBootstrap;
	return (
		<Container>
			<Row>
				<Col md={{ offset: 3, span: 6 }}>
					<SongSearch />
				</Col>
			</Row>
		</Container>
	);
}

function SongSearch() {
	const [items, setItems] = React.useState(null);
	const [displayCount, setDisplayCount] = React.useState(10);

	const onChange = (res) => {
			setItems(res);
		}

	return (
		<React.Fragment>
			<div >
				<h1 style={{textAlign:'center'}}>Josh's Song Search</h1>
				<p>Search a database of more than 3,000 songs!! 1990 called and they want to know how I stored so many songs on a cassette tape!</p>
			</div>
			<SearchForm onChange={(res)=>onChange(res)} />
			{items && items.length === 0 && (
				<div style={{textAlign:'center'}}>
					<h3 className="text-center">No results found!</h3>
					<div>
						<i className="fas fa-sad-tear" style={{height:'max-content', fontSize:'30vw', color:"rgba(255, 193, 7, 0.25)"}} />
					</div>
				</div>
			)}
			{items && items.slice(0,(displayCount-1)).map((item, key) => (
				<ItemDisplay
					item={item}
					key={key}
				/>
			))}
			{items && items.length > 0 && displayCount < items.length &&
				<div style={{width:'100%', textAlign:'center'}}>
					<a className={'text-button text-info'} onClick={()=>{setDisplayCount(displayCount + 10)}}>
						Load More
					</a>
				</div>
			}
		</React.Fragment>
	);
}

function SearchForm({ onChange }) {
	const { Form, InputGroup } = ReactBootstrap;

	const [query, setQuery] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [songCount, setSongCount] = React.useState(0);

	/**
	 * Returns a list of tracks which include the query input.
	 *
	 * @param {string} Query to search database of song titles
	 * @return {array} List of songs in the database which include the query string
	 */
	const fetchResults = q => {
		setQuery(q);
		setLoading(true);
		fetch('/tracks/' + q)
			.then(r => r.json())
			.then(tracks => {
				if(q === '') onChange(null);
				else onChange(tracks);
				setSongCount(tracks.length);
				setLoading(false);
			})
	};

	return (
		<Form>
			<InputGroup className="mb-3">
				<Form.Control
					value={query}
					onChange={e => fetchResults(e.target.value)}
					type="text"
					placeholder="Search the song database"
					aria-describedby="basic-addon1"
				/>
				<InputGroup.Append>
					{loading? 
						<i className="fas fa-spinner fa-spin" style={{height:'max-content', padding: '0.65em', marginLeft: -40}} />
						:
						songCount > 0 && query !== '' ?
							<span className="text-secondary" style={{padding: '0.4em', marginLeft: -90, zIndex: 100}}>{songCount} songs</span>
							:
							<span></span>	
					}
				</InputGroup.Append>
			</InputGroup>
		</Form>
	);
}

function ItemDisplay({ item }) {
	const { Container, Row, Col } = ReactBootstrap;

	/**
	 * Returns a human readable duration.
	 *
	 * @param {number} Time in milliseconds
	 * @return {string} A duration string in hh:mm:SS format
	 */
	const time = (mill) => {
		if(!mill || mill === 0) return ''

		let totalSeconds = Math.floor(mill/1000);
    let hr = Math.floor(totalSeconds / 3600);
    let min = Math.floor((totalSeconds - hr * 3600) / 60);
    let sec = totalSeconds - (hr * 3600 + min * 60);
    let hrString = hr? hr + ':':'';
    let minString = min + ':';
    let secString = ('00' + sec).slice(-2);
    return `${hrString}${minString}${secString}`
	}

	return (
		<Container fluid className={'item'}>
			<Row>
				<Col md={1} sm={false} className="text-center inner">
					<i className={'fab fa-napster text-danger'} />
				</Col>
				<Col xs={8} className="inner">
					{item.Name} - {item.Composer}
				</Col>
				<Col xs={3} className="text-center text-info inner">
					<i className="fa fa-clock" />
					<span style={{marginLeft: 5}}>{time(item.Milliseconds)}</span>
				</Col>
			</Row>
		</Container>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));
