package Model;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class MAddNote {
    public boolean addNote(int uid, String title, String content, java.sql.Date sqlDate) {
        Connection connection = DbConnection.dbConnect();
        try {
            String insertQuery = "INSERT INTO Documents (UID, Title, Content, Date) VALUES (?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(insertQuery);
            preparedStatement.setInt(1, uid);
            preparedStatement.setString(2, title);
            preparedStatement.setString(3, content);
            preparedStatement.setDate(4, sqlDate);

            int rowsInserted = preparedStatement.executeUpdate();

            preparedStatement.close();
            connection.close();

            return rowsInserted > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
