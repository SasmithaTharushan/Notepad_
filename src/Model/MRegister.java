package Model;
/*In this db con is maintained */

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.swing.JOptionPane;

public class MRegister {
    public boolean RegUser(String username, String email, String password) {
        Connection connection = DbConnection.dbConnect(); // Database Connection
        try {
            String insertQuery = "INSERT INTO User (Name, Password, Email) VALUES (?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(insertQuery);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);
            preparedStatement.setString(3, email);

            int rowsInserted = preparedStatement.executeUpdate();

            preparedStatement.close();
            connection.close();
            
            return rowsInserted > 0; // Return true if registration was successful
        } catch (SQLException e) {
            e.printStackTrace();
            // Handling exceptions
        }
        return false; // Registration failed
    }
}
