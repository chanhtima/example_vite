import { Tag } from 'primereact/tag';
import { Steps } from 'primereact/steps';
import Navbar from '../layout/Navbav';
import Sidebar from '../layout/Sidebar';


function Index() {

    const items = [
        { label: 'Personal' },
        { label: 'Seat' },
        { label: 'Payment' },
        { label: 'Confirmation' }
    ];

    return (
        <>
            <Navbar />
            <Sidebar />
            <h1 className="text-3xl font-bold underline text-red-400">
                Hello world!
            </h1>
            <div>

                <Steps model={items} />
            </div>
            <div className="card flex flex-wrap justify-content-center gap-2">
                <Tag value="Primary"></Tag>
                <Tag severity="success" value="Success"></Tag>
                <Tag severity="info" value="Info"></Tag>
                <Tag severity="warning" value="Warning"></Tag>
                <Tag severity="danger" value="Danger"></Tag>

            </div>

        </>
    )
}

export default Index