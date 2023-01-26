export const Square = ({children,  updateBoard, isSelected, index}) => {
 // Conditional CSS Classes 
 const className = `square ${isSelected ? 'is-selected' : ''}`;
 // Handle events  
 const handleClick = () => {
   updateBoard(index);
 }
 return (
   <div className={className}
        onClick={handleClick}>
     {/* CHILDREN CONCEP */}
     {children}
   </div>
 )
}