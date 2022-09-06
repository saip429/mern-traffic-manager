import React, { useState, useEffect } from 'react'
import axios from '../../axios'
import '../../global.css'
import Random from '../../random'

function AddScr() {
  const [towed, setTowed]= useState(false)
  const [impound, setImpound]= useState('')
  const[dlno, setDlno]= useState('')
 const[regno, setRegno]= useState('')
  const[name, setName]= useState('')
  const[location, setLocation]= useState('')
  const[Type, setType]= useState('')
  const[fine,setFine]= useState('')
  const [ispaid,setispaid]= useState()
  const d= new Date()
  const[reportNo, setReportNo] = useState('')
  useEffect(()=> {
     setReportNo(Random())
  },[])
  
  const date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
const time=new Date().toLocaleTimeString()
  
  

  
  const submitHandler=async(e)=>{
    e.preventDefault()
    

    const data = { 
      repno: reportNo,
      dlno: dlno,
      type: Type,
      date:date,
      time: time,
      location: location,
      paid: (ispaid === true)? 1 : 0,
    };
    
    await fetch('http://localhost:5000/offences/new/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => console.log(res));
      setDlno('')
      setName('')
      setLocation('')
      setFine('')
      setispaid(null)
      setType('')
      console.log('submit');

      //submit if impound is true
      if(impound==='true'){
        const imdata={
         regno: regno,
          impound:impound
        }
      }
  }
  return (
    <div className='add'>
      <form className='form' onSubmit={submitHandler}>
        <span className='report--no'>Report number: {reportNo}</span>
        <span className='report--date'> Date: {date}</span> 
        <span className='report--time'> Time: {time}</span><br></br>
        <label for="Dl-no">DL Number: </label>
        <input type="text" autoComplete='off' name='Dl-no' className="dl-no" value={dlno} onChange={(e)=>
        setDlno(e.target.value)} required />
         <label for="regno">Registration number: </label>
        <input type="text" autoComplete='off' className="Dl-no" name='regno' value={name} onChange={(e)=>
        setRegno(e.target.value)} required/>
        <label for="name">Name: </label>
        <input type="text" autoComplete='off' className="Dl-no" name='name' value={name} onChange={(e)=>
        setName(e.target.value)} required/>
       
        <label for="location">Location:</label>
        <input type="text" autoComplete='off' className="Dl-no" name='location' value={location} onChange={(e)=>
        setLocation(e.target.value)} required />
        <div className="otype">
        <div>
        <label for="type">Offence Type:</label>
        
        <select name="type" required id="type" onChange={(e)=>setType(e.target.value)}>
        <option value="select">select </option>
        <option value="no helmet">no helmet</option>
        <option value="no DL">no DL</option>
        <option value="signal jump">signal jump</option>
        <option value="no RC">no RC</option>
        <option value="no seatbelt">no seatbelt</option>
        <option value="no insurance">no insurance</option>
        <option value="overspeeding">overspeeding</option>
        <option value="drunk driving">drunk driving</option>
        </select>

        </div>
       
        <div>
        <label for="fine">Fine:</label>
        <input type="number" autoComplete='off' className="Dl-no" name='type' value={fine} onChange={(e)=>
        setFine(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="towed">towed:</label>
          <select name="towed" id="towed" onChange={(e)=>setTowed(e.target.value)}>
            <option value="">-</option>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
        </div>
       
        </div>
         
        
        <div className="ispaid">
        <label for='ispaid'>Is Paid: </label>
        <select name="ispaid" id="ispaid" onChange={(e)=>setispaid(e.target.value)} required>
        <option value='select'>select </option>
          <option value='true'>true</option>
          <option value='false'>false</option>
        </select>
        </div>


        <div className={`${towed==='true'?'impound':'none'}`}>
          <label htmlFor="impound">select impound</label>
          <select name="impound" id="impound" onChange={(e)=>setImpound(e.target.value)}>
            <option value="">-</option>
            <option value="Banashankari">Banashankari</option>
            <option value="RR nagar">RR nagar</option>
            <option value="indiranagar">indiranagar</option>
            <option value="jayanagar">jayanagar</option>
            <option value="hebbal">hebbal</option>
            <option value="yelahanka">yelahanka</option>
            <option value="e-city">e-city</option>
            <option value="silk board">silk board</option>
            <option value="HSR">HSR</option>
          </select>

        </div>
        <button className="btn--" type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddScr