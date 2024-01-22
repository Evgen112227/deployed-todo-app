import { useState } from 'react';
import { useCookies } from 'react-cookie';

// This modal is for creating and editing task

const Modal = ({ mode, setShowModal, task, getData }) => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const editMode = mode === 'edit' ? true : false;
	const [data, setData] = useState({
		user_email: editMode ? task.user_email : cookies.Email,
		title: editMode ? task.title : '',
		progress: editMode ? task.progress : '50',
		date: editMode ? task.date : new Date(),
	});

	const postData = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:8000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				//посылаем на бэк объект JSON, созданный из нашего стэйта в компоненте
				body: JSON.stringify(data),
			});
			console.log(JSON.stringify(data));
			if (response.status === 200) {
				console.log('worked!');
				// закрываем модалку
				setShowModal(false);
				//получаем данные
				getData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const editData = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (response.status === 200) {
				setShowModal(false);
				getData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((data) => ({
			...data,
			[name]: value,
		}));
	};

	return (
		<div className='overlay'>
			<div className='modal'>
				<div className='form-title-container'>
					<h3>Lets {mode} you task</h3>
					<button onClick={() => setShowModal(false)}>X</button>
				</div>

				<form>
					<input
						required
						maxLength={30}
						placeholder=' Your task goes here'
						name='title'
						value={data.title}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor='range'>Drag to select your current progress</label>
					<input
						id='range'
						type='range'
						required
						min='0'
						max='100'
						name='progress'
						value={data.progress}
						onChange={handleChange}
					/>
					<input className={mode} type='submit' onClick={editMode ? editData : postData} />
				</form>
			</div>
		</div>
	);
};
export default Modal;
