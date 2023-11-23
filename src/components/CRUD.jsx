import React from "react";
import {
    getAllBooks,
} from "../api/booksApi";

const CRUD = () => {
    const [bookData, setBookData] = React.useState([])
    React.useEffect(()=>{
        getAllBooks().then((data) => {
            setBookData(data)
        })
    }, [])

    return (
        <table>
            <tbody>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Автор</th>
                    <th>Жанр</th>
                    <th>Статус</th>
                </tr>
                {bookData.map((item,index) => (
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{item.name}</td>
                    <td>{item.author}</td>
                    <td>{item.genre}</td>
                    <td>{item.status}</td>
                    <td><button>Изменить</button></td>
                </tr>))}
            </tbody>
        </table>
    );
    };
    export default CRUD;