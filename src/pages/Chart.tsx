import { useEffect, useState } from "react"
import BasicDemo from "../components/chart/BasicDemo"
import { getBarChart } from "../services/api/api.mockup"
import ApexChart from "../components/chart/ApexChart";


function Chart() {
  const [data, setData] = useState<any>([]);
  const fetchData = async () => {
    try {
      const res = await getBarChart()
      if (res) {
        console.log("res,", res);
        setData(res)
      } else {
        console.error('Fetched data is not an array:');
        setData([]);
      }


    } catch (error) {
      console.error('Error fetching :', error);
      setData([]);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <div>Chart</div>
      <div>
        <div>
          <BasicDemo />
          <ApexChart data={data} />
        </div>
      </div>
    </>
  )
}

export default Chart