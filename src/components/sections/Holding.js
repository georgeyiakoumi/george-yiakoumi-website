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
            <h1>This is a holding page at best, don't judge me</h1>
            <h2>George Yiakoumi - Design Consultant - Website coming soon</h2>
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
