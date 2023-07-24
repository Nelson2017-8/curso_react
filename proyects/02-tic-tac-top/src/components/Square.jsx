export const Square = ({children, updateBrand, isSelected, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () => {
        updateBrand(index)
    }
    return (
        <div className={className} onClick={handleClick}>{children}</div>
    )
}