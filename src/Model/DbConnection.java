package Model;

import java.sql.*;
public class DbConnection 
{
    private static Connection con;
    public static Connection dbConnect()
    {
        try
        {
            String DBpath = "jdbc:mysql://localhost:3306/notepad?characterEncoding=utf8";
            con = DriverManager.getConnection(DBpath,"root","");
        }
        catch(SQLException e)
        {
            System.err.print(e);
        }
        return con;
    }
}
