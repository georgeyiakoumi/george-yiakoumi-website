// Holding.js
import React from 'react';
import { socialLinks } from '../../data/socialLinks.ts';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import BrushIcon from '@mui/icons-material/Brush'; // For Behance, using a generic icon

function Holding() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>George Yiakoumi</h1>
            <h2>Design Consultant</h2>
            <p>Website coming soon</p>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '20px', padding: 0 }}>
                <li>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon fontSize="large" />
                    </a>
                </li>
                <li>
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon fontSize="large" />
                    </a>
                </li>
                <li>
                    <a href={socialLinks.behance} target="_blank" rel="noopener noreferrer">
                        <BrushIcon fontSize="large" />
                    </a>
                </li>
                <li>
                    <a href={socialLinks.email} target="_blank" rel="noopener noreferrer">
                        <EmailIcon fontSize="large" />
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Holding;