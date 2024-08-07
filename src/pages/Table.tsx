import { Steps } from 'primereact/steps';

export default function Table() {
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
