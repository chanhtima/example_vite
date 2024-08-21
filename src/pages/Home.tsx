import { Steps } from "primereact/steps";

function Home() {
  const items = [
    { label: 'Personal' },
    { label: 'Seat' },
    { label: 'Payment' },
    { label: 'Confirmation' }
  ];
  return (
    <>
      <Steps model={items} />
      <h1>
        Heading1
      </h1>
      <h2>
        Heading2
      </h2>
      <h3>
        Heading3
      </h3>
      <h4>
        Heading4
      </h4>
      <h5>
        Heading5
      </h5>
      <h6>
        Heading6
      </h6>
    </>
  )
}

export default Home