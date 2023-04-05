import React, { useState } from 'react'

const Crud = () => {

  const [addStdnt, setAddStdnt] = useState({
    stdntName: '',
    stndClass: ''
  });

  const [storeStdnt, setStoreStdnt] = useState([]);
  const [showBtn, setShowBtn] = useState(true);
  const [stdntId, setStdntId] = useState(null);

  const handleInput = (e) => {
    setAddStdnt({ ...addStdnt, [e.target.name]: e.target.value });
  }

  const sbmtData = () => {
    const {stdntName, stndClass } = addStdnt;
    if( !stdntName || !stndClass){
      alert('PLease Fill kar lawde')
    }
    else{
      setStoreStdnt([...storeStdnt, addStdnt]);
      setAddStdnt({
        stdntName: '',
        stndClass: ''
      })
    }

  }

  const deletStdnt = (id)=>{
    setStoreStdnt(oldarr=>{
     return oldarr.filter((val, indx)=>{
        return indx !== id
      })
    })
  }

  const editBtn = (val, id)=>{
    setAddStdnt({
      stdntName: val.stdntName,
      stndClass: val.stndClass
    })
    setShowBtn(false)
    setStdntId(id)
  }


  const updtData = (id) => {
    const {stdntName, stndClass} = addStdnt;

    setStoreStdnt(
      storeStdnt.map((val, indx) => {
        if (indx === id) {
          return { ...val, stdntName: stdntName, stndClass: stndClass  };
        }
        return val;
      })
      )
      setAddStdnt({
        stdntName: '',
        stndClass: ''
      })
      setShowBtn(true)
  };

  return (
    <>
      <ul>
        <li><b>Students Names</b></li>
        <li><b>Class</b></li>
        <li><b>Edit</b></li>
        <li><b>Delete</b></li>

        {storeStdnt.map((val, id) => {
          return (
            <React.Fragment key={id}>
              <li>{val.stdntName}</li>
              <li>{val.stndClass}</li>
              <li><a 
              data-bs-toggle="modal" 
              href="#exampleModalToggle"
              onClick={()=>editBtn(val, id)}
              role="button">edit</a></li>
              {storeStdnt.length=== 1 ?  <li><div><i className="fa fa-trash" aria-hidden="true"></i></div></li> :  <li><div onClick={()=>deletStdnt(id)}><i className="fa fa-trash" aria-hidden="true"></i></div></li>}
         
            </React.Fragment>
          )
        })}
       
      </ul>
      <a className="create_btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button" onClick={()=>setShowBtn(true)}>Add New</a>


      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Add New Student</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button>
            </div>
            <div className="modal-body students_add">

              <form>
                <div className="form_input">
                  <label><b>Name<span>*</span></b></label>
                  <input type="text" name="stdntName" onChange={handleInput} value={addStdnt.stdntName} />
                </div>
                <div className="form_input">
                  <label><b>Class<span>*</span></b> <br />Please enter a value only this format (9th, 10th, 11th) </label>
                  <input type="text" name="stndClass" maxLength='4' minLength='3' onChange={handleInput} value={addStdnt.stndClass} />
                </div>
              </form>

            </div>
            <div className="modal-footer students_addbtn">
            
            {showBtn===true? <button data-bs-dismiss="modal" aria-label="Close" onClick={sbmtData}> Submit </button>:
            <button data-bs-dismiss="modal" aria-label="Close" onClick={()=>updtData(stdntId)}> Update </button>
             }

            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Crud
