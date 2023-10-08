package Model;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MLogin {
    public boolean validateUser(String username, String password) {
        boolean isValid = false;

        try {
            Connection connection = DbConnection.dbConnect();
            String query = "SELECT UID FROM User WHERE Name = ? AND Password = ?";

            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                isValid = true;
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return isValid; // Return true or false based on validation
    }
}
