import Breadcrumb from "./Breadcrumb";


const breadcrumbData = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Laptops' },
];

function BreadcrumbParent() {
    return (
        <>
            <Breadcrumb items={breadcrumbData} />
            <h1>Laptops</h1>
        </>
    );
}

export default BreadcrumbParent