import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

   function onThisClick() {
    navigate("/files");
   }

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={()=> onThisClick()}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized