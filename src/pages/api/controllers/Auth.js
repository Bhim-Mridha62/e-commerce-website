export const createUser = async (req, res) => {
    try {
        res.status(201).json({ message:"Usuario createUser" });
    } catch (err) {
      res.status(400).json("create user");
    }
  };

 export const loginUser = async (req, res) => {
     try {
        res.status(201).json({ message:"Usuario loginUser" });
     } catch (error) {
        res.status(400).json("loginUser");
     }
  }; 

  export const logout = async (req, res) => {
   try {
    res.status(201).json({ message:"Usuario logout" });
   } catch (error) {
    res.status(400).json("logout");
   }
  };
  export const test = async (req, res) => {
   try {
    res.status(201).json({ message:"Usuario test" });
   } catch (error) {
    res.status(400).json("test");
   }
  };
  