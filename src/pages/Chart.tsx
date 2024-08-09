import { useEffect, useState } from "react"
import BasicDemo from "../components/chart/BasicDemo"
import { getBarBasics, getBarChart } from "../services/api/api.mockup"
import ApexChart from "../components/chart/ApexChart";
import ChartBasicBar from "../components/chart/ChartBasicBar";
import { TabPanel, TabView } from "primereact/tabview";


function Chart() {
  const [data, setData] = useState<any>([]);
  const [dataBar, setDataBar] = useState<{ series: any[]; categories: any[] } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetchData = async () => {
    try {
      const res = await getBarChart()
      const resBar = await getBarBasics()
      if (res && resBar) {
        console.log("res,", resBar);
        setDataBar(resBar)
        setData(res)
      } else {
        console.error('Fetched data is not an array:');
        setData([]);
        setDataBar(null);
      }


    } catch (error) {
      console.error('Error fetching :', error);
      setData([]);
      setDataBar(null);;
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const colors = ['#d4526e', '#13d8aa',] // เรียกสีตามลำดับ categories

  return (
    <>

      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header="Chart primereact">
          <BasicDemo />
        </TabPanel>
        <TabPanel header="ApexChart Timeline ">
          <div className="border p-4 rounded-md">
            <ApexChart data={data} title="Timeline Charts" />
          </div>
        </TabPanel>
        <TabPanel header="ApexChart BasicBar " className=" space-y-4">
           {/* แนวนอน */}
           <div className="border p-4 rounded-md">
            {dataBar ? (
              <ChartBasicBar
                series={dataBar.series}
                horizontal
                enabled // แสดงผลรวม
                categories={dataBar.categories}
                title="Fiction Books Sales"
                colors={colors}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </div>
             {/* แนวตั้ง */}
             <div className="border p-4 rounded-md">
            {dataBar ? (
              <ChartBasicBar
                series={dataBar.series}
                enabled // แสดงผลรวม
                categories={dataBar.categories}
                title="Fiction Books Sales"
                colors={colors}
              />
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </TabPanel>
        <TabPanel header="ApexChart  Pie Chart ">
        
        </TabPanel>

      </TabView>

      
    </>
  )
}

export default Chart