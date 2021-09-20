import React, { useState, useEffect } from "react";
import "./home.scss";

export function Home() {
	// JS aqui abaixo

	const [newTask, setNewTask] = useState("");
	const [backToDo, setBackToDo] = useState([]);
	const counter = backToDo.length;

	useEffect(() => {
		// Update the document title using the browser API
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/fsdexter",
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				console.log(result);
				setBackToDo(result.map(iten => iten));
			})
			.catch(error => console.log("error", error));
	}, []);

	const enterHandler = event => {
		if (event.key === "Enter") {
			setNewTask("");
			setBackToDo([
				...backToDo,
				{
					label: event.target.value,
					done: false
				}
			]);
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify([
				...backToDo,
				{
					label: event.target.value,
					done: false
				}
			]);

			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};

			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/fsdexter",
				requestOptions
			)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log("error", error));
		}
	};

	const backToDoList = backToDo.map((iten, i) => {
		return (
			<li key={i}>
				<div className="row">
					<div className="col d-flex justify-content-between">
						{iten.label}
						{iten.done === false ? (
							<i
								id="trash"
								className="far fa-check-square"
								onClick={() => setDone(iten)}
							/>
						) : (
							<i
								id="trash"
								className="fas fa-trash-alt"
								onClick={() => del(i)}
							/>
						)}
					</div>
				</div>
			</li>
		);
	});

	function setDone(iten) {
		for (let obj in backToDo) {
			if (backToDo[obj] == iten) {
				backToDo[obj].done = true;
			}
		}
		setBackToDo([...backToDo]);
	}

	function del(i) {
		let newList = backToDo.filter((iten, index) => index !== i);

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(newList);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/fsdexter",
			requestOptions
		)
			.then(response => response.text())
			.then(result => {
				setBackToDo(newList);
			})
			.catch(error => console.log("error", error));
	}

	return (
		<div className="container d-flex justify-content-md-center row mt-5">
			<div id="caixa" className="col-7 ">
				<h1 className="text-center">ToDo List</h1>
				<div className="row justify-content-md-center">
					<div className="col col-lg-8">
						<center>
							<input
								value={newTask}
								id="input"
								type="text"
								placeholder="New Task"
								onChange={event => {
									setNewTask(event.target.value);
								}}
								onKeyPress={enterHandler}
							/>
						</center>
					</div>
				</div>
				<div className="row justify-content-md-center">
					<div className="col col-lg-8 mt-3">
						{counter > 0 ? (
							<ul>{backToDoList}</ul>
						) : (
							<p>No tasks, add a task</p>
						)}
					</div>
				</div>
				<div className="row justify-content-md-center">
					<div className="col col-lg-8 mt-3">
						<center>
							<p>YOU HAVE {counter} TASKS TODO</p>
						</center>
					</div>
				</div>

				<div className="text-center">Made by Felipe</div>
			</div>
		</div>
	);
}
