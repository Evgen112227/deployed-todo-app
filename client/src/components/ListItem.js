import { useState } from 'react';
import Modal from './Modal';
import ProgressBar from './ProgressBar';
import TickIcon from './TickItem';

const ListItem = ({ task, getData }) => {
	const [showModal, setShowModal] = useState(false);

	const deleteData = async (task) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(task),
			});
			if (response.status === 200) {
				setShowModal(false);
				getData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='list-item'>
			<div className='info-container'>
				<TickIcon />
				<p className='task-title'>{task.title}</p>
				<ProgressBar progress={task.progress} />
			</div>

			<div className='button-container'>
				<button className='edit' onClick={() => setShowModal(true)}>
					EDIT
				</button>
				<button className='delete' onClick={() => deleteData(task)}>
					DELETE
				</button>
			</div>
			{showModal && (
				<Modal mode={'edit'} setShowModal={setShowModal} task={task} getData={getData} />
			)}
		</div>
	);
};
export default ListItem;
