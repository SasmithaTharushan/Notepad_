package InsertData;

import Model.MAddNote;
import View.VAddNote; // Import the correct view class

public class CAddNote {
    private VAddNote view; // Declare the view reference
    private MAddNote model;

    public CAddNote() {
        model = new MAddNote();
        view = new VAddNote(this); // Pass the controller instance to the view
        view.setVisible(true);
    }

    public boolean addNote(int uid, String title, String content, java.sql.Date sqlDate) {
        return model.addNote(uid, title, content, sqlDate);
    }

    public void setUID(int uid) {
        //view.setUID(uid);
    }

    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new CAddNote();
            }
        });
    }
}
