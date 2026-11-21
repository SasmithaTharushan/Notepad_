/*This acs as a bridge in between view and model if the reg is successful a msg will be displayed */
package Controller;
import Model.MRegister;
import javax.swing.JOptionPane;
public class CRegister {
    public void RegUser(String username,String email,String password)
    {
        MRegister mregobj = new MRegister();
        boolean registrationSuccessful = mregobj.RegUser(username, email, password);
        
        if (registrationSuccessful) {
            // Update the view or communicate with the user here...
            
            JOptionPane.showMessageDialog(null, "Registration successful!");
        } else {
            //System.out.println("Registration failed.");
            
           JOptionPane.showMessageDialog(null, "Registration failed.");
        }
    }
}
