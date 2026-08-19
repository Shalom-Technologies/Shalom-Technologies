import { NavLink } from 'react-router';

export default function Home() {
    return (
        <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/blog" end>Blog</NavLink>
            <NavLink to="/pricing" end>Pricing</NavLink>
            <NavLink to="/blog-page" end>BlogPage</NavLink>
            <NavLink to="/Careers" end>Careers</NavLink>
        </nav>
    )
}