
import './Holygrail.scss';

const Holygrail: React.FC = () => {
    return (
        <div className="holygrail">
            <header className="header">Header</header>
            <nav className="left">Left Sidebar</nav>
            <main className="main">Main Content</main>
            <aside className="right">Right Sidebar</aside>
            <footer className="footer">Footer</footer>
        </div>
    );
};

export default Holygrail;