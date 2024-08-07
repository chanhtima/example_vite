import { Steps } from "primereact/steps";

function Home() {
  const items = [
    { label: 'Personal' },
    { label: 'Seat' },
    { label: 'Payment' },
    { label: 'Confirmation' }
  ];
  return (
    <Steps model={items} />
  )
}

export default Home