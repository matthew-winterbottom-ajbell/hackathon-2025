export const getTranspiredTimeInMinutes = (dateTime: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - dateTime.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}