const SectionTitle = ({ name, subTitle }) => {
  return (
    <h2 className='section-title'>
      <span className='session-name'>{name}</span>
      {
        subTitle ? <span className='session-subtitle'>{subTitle}</span> : ''
      }

    </h2>
  )
}

export default SectionTitle;