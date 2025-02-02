function Loading(): JSX.Element {
  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <img
        src="https://15.design.htmlacademy.pro/static/hotel/11.jpg"
        alt="Just loading"
        style={{
          width: '400px',
          border: '4px solid #9E471A',
          borderRadius: '50%',
          boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)' }}
      />
      <p style={{ fontSize: '40px', color: '#9E471A'}}>Loading... Wait a moment</p>
      <div
        className="loader"
        style={{
          border: '8px solid #f3f3f3',
          borderTop: '8px solid #9E471A',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto' }}
      >
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
export default Loading;
