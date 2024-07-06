// tailwind.config.js

module.exports = {
    "compilerOptions": {
        "types": ["nativewind/types"]
      },
      content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {
          color:{
            primary:'#161622'
          }
        },
      },
      plugins: [],
    
    }