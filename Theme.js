// theme.js
const Theme = {
    colors: {
      background: '#004D40', // Dark Green background
      primaryButton: '#FFD54F', // Gold for primary actions
      secondaryButton: '#A7FFEB', // Light Green for secondary actions
      heading: '#FFD54F', // Gold for headings
      bodyText: '#FFFFFF', // White text for body
      inputBorder: '#A7FFEB', // Light Green for input borders
      footerBackground: '#00332A', // Dark Green footer background
      footerText: '#FFFFFF', // White text in footer
    },
    textStyles: {
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD54F', // Gold
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004D40', // Dark Green for button text
      },
      inputText: {
        color: '#FFFFFF', // White text for input fields
      },
    },
    buttonStyles: {
      primaryButton: {
        backgroundColor: '#FFD54F', // Gold background for primary button
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignItems: 'center',
      },
      secondaryButton: {
        backgroundColor: '#A7FFEB', // Light Green background for secondary button
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignItems: 'center',
      },
    },
    inputStyles: {
      borderColor: '#A7FFEB', // Light Green border for inputs
      borderWidth: 1,
      height: 40,
      marginBottom: 20,
      paddingLeft: 10,
    },
  };
  
  export default Theme;
  