const AddEntry = () => {
    
  return (
    <form>
      <div><label>date</label><input type="date"/></div>
      <div><label>visibility</label><input type="text"/></div>
      <div><label>weather</label><input type="text"/></div>
      <div><label>comment</label><input type="text"/></div>
      <button type="submit" >Add</button>
    </form>
  );
};

export default AddEntry;
