export default function formatTimeAmPm(timeString) {
    if(timeString){
        const [hours, minutes] = timeString.split(':');

        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
    
        // Format the hours and minutes
        let formattedHours = date.getHours();
        const ampm = formattedHours >= 12 ? 'PM' : 'AM';
    
        // Convert to 12-hour format
        formattedHours = formattedHours % 12;
        formattedHours = formattedHours ? formattedHours : 12; // the hour '0' should be '12'
    
        // Format the minutes
        const formattedMinutes = date.getMinutes().toString().padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
}