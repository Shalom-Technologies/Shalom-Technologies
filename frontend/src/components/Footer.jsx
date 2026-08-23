import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <footer className="py-5">
      <Container>
        <p className="mb-0">
          © {new Date().getFullYear()} Shalom Technologies.
          All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;