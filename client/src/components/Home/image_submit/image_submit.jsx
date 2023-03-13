
export default function Image_submit() {

    return (
        <div className="form_image">
            <form>
                <label className="input-file">
                    <input 
                    type="file" 
                    name="file" 
                    accept="image/*" 
                    onClick={(e)=>{
                        console.log(e);
                    }}/>
                        <span>Choose Image</span>
                </label>
            </form>
        </div>
    )
}