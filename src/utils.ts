export const formatDate = (date: Date) => {
  let formatedDate = new Date(date)
    return new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(formatedDate) 
  }