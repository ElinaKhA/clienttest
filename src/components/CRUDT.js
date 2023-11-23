import {Component} from "react";
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";

export default class CRUD extends Component{
    constructor (props){
        super(props);
        this.state={bookData:[], addModalShow:false, editModalShow:false}
    }
    
    componentDidUpdate(){
        this.refreshList();
    }

    deleteBook(bookid) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:5202/api/Books/' + bookid, {
                method: 'DELETE',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.ok) {
                    // Обновить список книг после успешного удаления
                    this.refreshList();
                }
            });
        }
    }
    

    refreshList(){
    fetch('http://localhost:5202/GetBooks')
    .then(response=>response.json())
    .then(data => {
    this.setState({bookData:data});
    }
    );
    }

    render(){
        const {bookData, bid, bname, bauthor, bgenre, bstatus}=this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});

        return(
        <><Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Жанр</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {bookData.map(book => <tr key={book.id}>
                        {/* <td>{++index}</td> */}
                        <td>{book.id}</td>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.status}</td>
                        <td><ButtonToolbar>
                            <Button variant="primary" 
                            onClick={() => this.setState({ editModalShow: true, bid: book.id, bname: book.name, bauthor: book.author, 
                                bgenre: book.genre, bstatus: book.status })}>Изменить</Button>
<EditBookModal
    show={this.state.editModalShow}
    onHide={editModalClose}
    bid={bid}
    bname={bname}
    bauthor={bauthor}
    bgenre={bgenre}
    bstatus={bstatus}
/>
                            </ButtonToolbar></td>
                        <td><ButtonToolbar><Button variant="danger" onClick={()=> this.deleteBook(book.id)} >Удалить</Button></ButtonToolbar></td>
                    </tr>)}
                </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={()=>this.setState({addModalShow:true})}>Добавить книгу</Button>
                <AddBookModal 
                show={this.state.addModalShow}
                onHide={addModalClose} />
            </ButtonToolbar></>

        );
    }
}
    