const Header = () => {
  return (
    <header style={{display: "flex", width: "100%", justifyContent: "space-between", padding: "0 10px", backgroundColor: "var(--chakra-colors-common-900)"}}>
        <h2>Game Linker</h2>
        <ul style={{display: "flex", width: "30%",justifyContent: "space-between"}}>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
        </ul>
    </header>
  )
}

export default Header
