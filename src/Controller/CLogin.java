package Controller;

import Model.MLogin;
import View.VLogin;

public class CLogin {
    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new VLogin().setVisible(true);
            }
        });
    }
}
