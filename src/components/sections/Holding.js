// Holding.js
import React from 'react';
import { socialLinks } from '../../data/socialLinks.ts';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import BrushIcon from '@mui/icons-material/Brush'; // For Behance

const iconComponents = {
    LinkedIn: <LinkedInIcon fontSize="large" />,
    Twitter: <TwitterIcon fontSize="large" />,
    Behance: <BrushIcon fontSize="large" />,
    Email: <EmailIcon fontSize="large" />
};

function Holding() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>George Yiakoumi</h1>
            <h2>Design Consultant</h2>
            <p>Website coming soon</p>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '20px', padding: 0 }}>
                {socialLinks.map((link) => (
                    <li key={link.name}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}>
                            {iconComponents[link.name]}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Holding;
