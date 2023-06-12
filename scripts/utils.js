export function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  export function formatPrice(price) {
    if (price === 0) {
      return 'Free';
    }
    return '$' + price.toFixed(2);
  }
  
  export function formatLocation(location) {
    if (location && location.place && location.city && location.state) {
      return `${location.place} • ${location.city}, ${location.state}`;
    } else {
      return '';
    }
  }
  