import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Auth from './components/Auth';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';

function App() {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const userEmail = cookies.Email;
	const authToken = cookies.AuthToken;
	const [tasks, setTasks] = useState(null);
	// get todo based on certain user_email

	const getData = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
			const json = await response.json();
			setTasks(json);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (authToken) {
			getData();
		}
	}, [authToken]);

	const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

	return (
		<div className='app'>
			{!authToken && <Auth />}
			{authToken && (
				<>
					<ListHeader getData={getData} listname={'Holiday Tick list 🎈'} />
					<p>Welcome back {userEmail}</p>
					{sortedTasks
						? sortedTasks.map((task) => <ListItem getData={getData} key={task.id} task={task} />)
						: null}
				</>
			)}
		</div>
	);
}

export default App;
