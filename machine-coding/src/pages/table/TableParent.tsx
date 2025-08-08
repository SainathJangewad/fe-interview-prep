
import Table, { Column } from './Table';

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

const users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 22 },
];

const columns: Column<User>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age', sortable: true },
];

function TableParent() {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>User Table</h2>
            <Table data={users} columns={columns} />
        </div>
    );
}

export default TableParent; 
