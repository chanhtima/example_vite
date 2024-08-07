import { useEffect } from 'react'
import { getPhotos } from '../services/api/photos.api.mockup'

export default function Galleria() {
    useEffect(()=>{
        const getData=async()=>{
            const res = await getPhotos()
            console.log("res",res);
            
        }
      getData()
    },[])
  return (
    <div>Galleria</div>
  )
}
