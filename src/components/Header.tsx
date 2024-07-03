import SignOutBtn from "./SignOutBtn"

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md p-4">
      <nav className="container mx-auto flex justify-end items-center">
        <ul className="flex space-x-4">
          <li>
            <SignOutBtn />
          </li>
        </ul>
      </nav>
    </header>
  )
}

