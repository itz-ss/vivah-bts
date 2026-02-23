import ContactSection from '../../components/sections/contact/ContactSection';
import contactData from '../../data/contact.json';

export const metadata = {
    title: 'Contact Vivah BTS | Booking & Inquiries',
    description: 'Get in touch with Vivah BTS to capture your cinematic wedding story and behind-the-scenes moments.',
};

export default function ContactPage() {
    return (
        <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <ContactSection data={contactData} />
        </main>
    );
}
