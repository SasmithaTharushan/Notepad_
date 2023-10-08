
package Dashboard;
import InsertData.UiFrame;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.design.JRDesignQuery;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.sf.jasperreports.view.JasperViewer;
import DbConnection.DbConnection; 
import java.awt.BorderLayout;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.swing.table.DefaultTableModel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import java.sql.Connection;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import javax.swing.JMenuItem;
import javax.swing.SwingUtilities;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;
import javax.swing.JOptionPane;

public class Dashboard extends javax.swing.JFrame {

    private DefaultTableModel tableModel;
    private final JPanel sidePanel;
    public Dashboard() {
       initComponents();
       ContentTable.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (SwingUtilities.isRightMouseButton(e)) {
                    int selectedRow = ContentTable.rowAtPoint(e.getPoint());
                    if (selectedRow >= 0) {
                        ContentTable.setRowSelectionInterval(selectedRow, selectedRow);
                        JPopupMenu popupMenu = createPopupMenu(selectedRow);
                        popupMenu.show(ContentTable, e.getX(), e.getY());
                    }
                }
            }
        });
       
        tableModel = new DefaultTableModel(new Object[]{"Doc Title", "Content", "Created Date"}, 0);
        ContentTable.setModel(tableModel);
        
        // Disable cell editing for the entire table
        ContentTable.setDefaultEditor(Object.class, null);
        
        // Add ListSelectionListener to ContentTable
         ContentTable.getSelectionModel().addListSelectionListener(new ListSelectionListener() {
        @Override
        public void valueChanged(ListSelectionEvent e) {
            if (!e.getValueIsAdjusting()) {
                int selectedRow = ContentTable.getSelectedRow();
                if (selectedRow >= 0) {
                    String content = tableModel.getValueAt(selectedRow, 1).toString();
                    NoteArea.setText(content);
                }
            }
        }
    });
         
   // Modifying the layout creation for DynaNotesGrid
        DynaNotesGrid.setLayout(new BorderLayout());
        DynaNotesGrid.add(jScrollPane1, BorderLayout.WEST); // ContentTable
        DynaNotesGrid.add(jPanel1, BorderLayout.CENTER);    // Tab pane

        // Create a side panel
        sidePanel = new JPanel();
        sidePanel.setLayout(new BorderLayout());

        // Create buttons for editing and saving
        

        // Add the side panel to the DynaNotesGrid
        DynaNotesGrid.add(sidePanel, BorderLayout.EAST);

        setResizable(false);
    }
      
    // </editor-fold>

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel2 = new javax.swing.JPanel();
        jScrollPane3 = new javax.swing.JScrollPane();
        jTable1 = new javax.swing.JTable();
        jPopupMenu1 = new javax.swing.JPopupMenu();
        Upperpanel = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        lblsearch = new javax.swing.JLabel();
        txtsearch = new javax.swing.JTextField();
        btnaddnote = new javax.swing.JButton();
        jButton4 = new javax.swing.JButton();
        jButton5 = new javax.swing.JButton();
        jButton2 = new javax.swing.JButton();
        jButton3 = new javax.swing.JButton();
        jButton1 = new javax.swing.JButton();
        jButton7 = new javax.swing.JButton();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        btncreatereport = new javax.swing.JButton();
        btnrefresh = new javax.swing.JButton();
        DynaNotesGrid = new javax.swing.JPanel();
        jScrollPane1 = new javax.swing.JScrollPane();
        ContentTable = new javax.swing.JTable();
        jPanel1 = new javax.swing.JPanel();
        Content = new javax.swing.JTabbedPane();
        jScrollPane2 = new javax.swing.JScrollPane();
        NoteArea = new javax.swing.JTextArea();

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 100, Short.MAX_VALUE)
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 100, Short.MAX_VALUE)
        );

        jTable1.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Title 1", "Title 2", "Title 3", "Title 4"
            }
        ));
        jScrollPane3.setViewportView(jTable1);

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        Upperpanel.setBackground(new java.awt.Color(255, 255, 255));

        jLabel1.setBackground(new java.awt.Color(51, 51, 51));
        jLabel1.setFont(new java.awt.Font("Verdana", 1, 24)); // NOI18N
        jLabel1.setText("Auxa Notes");

        lblsearch.setFont(new java.awt.Font("Verdana", 1, 12)); // NOI18N
        lblsearch.setText("Search Notes");

        txtsearch.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtsearchActionPerformed(evt);
            }
        });
        txtsearch.addKeyListener(new java.awt.event.KeyAdapter() {
            public void keyReleased(java.awt.event.KeyEvent evt) {
                txtsearchKeyReleased(evt);
            }
        });

        btnaddnote.setBackground(new java.awt.Color(255, 255, 255));
        btnaddnote.setForeground(new java.awt.Color(255, 255, 255));
        btnaddnote.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Dashboard/Add Note Btn.png"))); // NOI18N
        btnaddnote.setBorder(null);
        btnaddnote.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnaddnoteActionPerformed(evt);
            }
        });

        jButton4.setText("To Do List");

        jButton5.setText("View Calender");

        jButton2.setText("Reminders");
        jButton2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton2ActionPerformed(evt);
            }
        });

        jButton3.setText("Events");

        jButton1.setBackground(new java.awt.Color(255, 255, 255));
        jButton1.setForeground(new java.awt.Color(255, 255, 255));
        jButton1.setIcon(new javax.swing.ImageIcon(getClass().getResource("/Dashboard/User.png"))); // NOI18N

        jButton7.setFont(new java.awt.Font("Segoe UI", 0, 10)); // NOI18N
        jButton7.setText("Log Out");
        jButton7.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton7ActionPerformed(evt);
            }
        });

        jLabel2.setFont(new java.awt.Font("Verdana", 1, 10)); // NOI18N
        jLabel2.setText("Create Note");

        jLabel3.setFont(new java.awt.Font("Verdana", 1, 12)); // NOI18N
        jLabel3.setText("Want to see analytics of your notes ? ");

        btncreatereport.setBackground(new java.awt.Color(204, 255, 204));
        btncreatereport.setFont(new java.awt.Font("Segoe UI", 0, 10)); // NOI18N
        btncreatereport.setForeground(new java.awt.Color(0, 0, 0));
        btncreatereport.setText("Create");
        btncreatereport.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btncreatereportActionPerformed(evt);
            }
        });

        btnrefresh.setText("Refresh Notes");
        btnrefresh.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnrefreshActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout UpperpanelLayout = new javax.swing.GroupLayout(Upperpanel);
        Upperpanel.setLayout(UpperpanelLayout);
        UpperpanelLayout.setHorizontalGroup(
            UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, UpperpanelLayout.createSequentialGroup()
                .addGroup(UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                    .addGroup(UpperpanelLayout.createSequentialGroup()
                        .addContainerGap()
                        .addGroup(UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(UpperpanelLayout.createSequentialGroup()
                                .addComponent(jLabel3)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(btncreatereport))
                            .addGroup(UpperpanelLayout.createSequentialGroup()
                                .addComponent(jButton7)
                                .addGap(18, 18, 18)
                                .addComponent(lblsearch, javax.swing.GroupLayout.PREFERRED_SIZE, 100, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(txtsearch, javax.swing.GroupLayout.PREFERRED_SIZE, 297, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(UpperpanelLayout.createSequentialGroup()
                                .addComponent(jButton5, javax.swing.GroupLayout.PREFERRED_SIZE, 124, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(jButton2, javax.swing.GroupLayout.PREFERRED_SIZE, 124, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(jButton4, javax.swing.GroupLayout.PREFERRED_SIZE, 124, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGap(18, 18, 18)
                                .addComponent(jButton3, javax.swing.GroupLayout.PREFERRED_SIZE, 124, javax.swing.GroupLayout.PREFERRED_SIZE)))
                        .addGap(1, 1, 1))
                    .addGroup(UpperpanelLayout.createSequentialGroup()
                        .addGap(26, 26, 26)
                        .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 32, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 174, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(127, 127, 127)))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 14, Short.MAX_VALUE)
                .addGroup(UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, UpperpanelLayout.createSequentialGroup()
                        .addComponent(btnrefresh)
                        .addGap(17, 17, 17))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, UpperpanelLayout.createSequentialGroup()
                        .addComponent(btnaddnote)
                        .addGap(39, 39, 39))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, UpperpanelLayout.createSequentialGroup()
                        .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 91, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addContainerGap())))
        );
        UpperpanelLayout.setVerticalGroup(
            UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(UpperpanelLayout.createSequentialGroup()
                .addGroup(UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(UpperpanelLayout.createSequentialGroup()
                        .addGap(14, 14, 14)
                        .addGroup(UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                            .addComponent(jLabel1)
                            .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(24, 24, 24)
                        .addGroup(UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jButton7)
                            .addComponent(lblsearch)
                            .addComponent(txtsearch, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                    .addGroup(UpperpanelLayout.createSequentialGroup()
                        .addGap(19, 19, 19)
                        .addComponent(btnaddnote, javax.swing.GroupLayout.PREFERRED_SIZE, 48, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jLabel2)))
                .addGap(17, 17, 17)
                .addGroup(UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jButton5)
                    .addComponent(jButton2)
                    .addComponent(jButton4)
                    .addComponent(jButton3)
                    .addComponent(btnrefresh))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(UpperpanelLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel3, javax.swing.GroupLayout.PREFERRED_SIZE, 25, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(btncreatereport))
                .addGap(0, 7, Short.MAX_VALUE))
        );

        DynaNotesGrid.setLayout(new java.awt.GridLayout(1, 0));

        ContentTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null},
                {null, null, null, null}
            },
            new String [] {
                "Doc Title", "Content ", "Created Date ", "Doc ID"
            }
        ) {
            boolean[] canEdit = new boolean [] {
                false, false, false, true
            };

            public boolean isCellEditable(int rowIndex, int columnIndex) {
                return canEdit [columnIndex];
            }
        });
        ContentTable.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                ContentTableMouseClicked(evt);
            }
        });
        jScrollPane1.setViewportView(ContentTable);
        if (ContentTable.getColumnModel().getColumnCount() > 0) {
            ContentTable.getColumnModel().getColumn(0).setResizable(false);
            ContentTable.getColumnModel().getColumn(1).setResizable(false);
        }

        DynaNotesGrid.add(jScrollPane1);

        jPanel1.setLayout(new java.awt.GridLayout(1, 0));

        NoteArea.setEditable(false);
        NoteArea.setColumns(20);
        NoteArea.setRows(5);
        jScrollPane2.setViewportView(NoteArea);

        Content.addTab("Content", jScrollPane2);

        jPanel1.add(Content);

        DynaNotesGrid.add(jPanel1);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(DynaNotesGrid, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
            .addComponent(Upperpanel, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(Upperpanel, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(DynaNotesGrid, javax.swing.GroupLayout.DEFAULT_SIZE, 216, Short.MAX_VALUE))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    
    private void btnaddnoteActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnaddnoteActionPerformed
    UiFrame uiFrame = new UiFrame(); // Creating an instance of UiFrame
    uiFrame.setVisible(true); // Making the UiFrame visible
    }//GEN-LAST:event_btnaddnoteActionPerformed

    private void jButton7ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton7ActionPerformed
        
    }//GEN-LAST:event_jButton7ActionPerformed

    private void jButton2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton2ActionPerformed
        
    }//GEN-LAST:event_jButton2ActionPerformed

    private void btncreatereportActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btncreatereportActionPerformed
          try {
         Connection connection = DbConnection.dbConnect(); 
        JasperDesign jasDesign = JRXmlLoader.load("C:\\Users\\udaba\\OneDrive\\Documents\\NetBeansProjects\\CWProject\\src\\Dashboard\\report.jrxml");
        
        JRDesignQuery desquery = new JRDesignQuery();   
        String sqlquery = "SELECT \n" +
                        "    U.Name,\n" +
                        "    COUNT(DISTINCT D.DocID) AS TotalDocuments,\n" +
                        "    COUNT(DISTINCT E.EventID) AS TotalEvents,\n" +
                        "    COUNT(DISTINCT T.TID) AS TotalTasks\n" +
                        "FROM \n" +
                        "    User U\n" +
                        "LEFT JOIN \n" +
                        "    Documents D ON U.UID = D.UID\n" +
                        "LEFT JOIN \n" +
                        "    Event E ON U.UID = E.UID\n" +
                        "LEFT JOIN \n" +
                        "    Tasks T ON U.UID = T.UID\n" +
                        "GROUP BY\n" +
                        "    U.UID, U.Name;";
        desquery.setText(sqlquery);
        jasDesign.setQuery(desquery);
        
        JasperReport jasreport = JasperCompileManager.compileReport(jasDesign);
        JasperPrint jasprint = JasperFillManager.fillReport(jasreport, null, DbConnection.dbConnect());
        JasperViewer.viewReport(jasprint);
    } catch (Exception e) {
        e.printStackTrace();
    }
    }//GEN-LAST:event_btncreatereportActionPerformed

private Map<Integer, Integer> rowIndexToDocIDMap = new HashMap<>();
// Create a map to store the association between row index and document ID
    private void btnrefreshActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnrefreshActionPerformed
       try {
        Connection connection = DbConnection.dbConnect();
        int loggedInUserID = ...; // Retrieve the user ID using MLogin class

        Statement statement = connection.createStatement();
        String sqlQuery = "SELECT DocID, Title, Content, Date FROM Documents WHERE UID = " + loggedInUserID;
        ResultSet resultSet = statement.executeQuery(sqlQuery);

        DefaultTableModel tableModel = (DefaultTableModel) ContentTable.getModel();
        tableModel.setRowCount(0);
        rowIndexToDocIDMap.clear();

        int rowIndex = 0;
        while (resultSet.next()) {
            int docID = resultSet.getInt("DocID");
            String title = resultSet.getString("Title");
            String content = resultSet.getString("Content");
            String date = resultSet.getString("Date");
            tableModel.addRow(new Object[]{title, content, date});

            rowIndexToDocIDMap.put(rowIndex, docID);
            rowIndex++;
        }

        resultSet.close();
        statement.close();
        connection.close();

        if (ContentTable.getRowCount() > 0) {
            ContentTable.setRowSelectionInterval(0, 0);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    }//GEN-LAST:event_btnrefreshActionPerformed

    private void txtsearchKeyReleased(java.awt.event.KeyEvent evt) {//GEN-FIRST:event_txtsearchKeyReleased
        String searchTitle = txtsearch.getText();

    try {
        Connection connection = DbConnection.dbConnect();
        Statement statement = connection.createStatement();

        String sqlQuery = "SELECT Title, Content, Date FROM Documents WHERE Title LIKE '%" + searchTitle  + "%' OR Content LIKE '%" + searchTitle  + "%'";

        ResultSet resultSet = statement.executeQuery(sqlQuery);

        DefaultTableModel tableModel = (DefaultTableModel) ContentTable.getModel();
        tableModel.setRowCount(0); // Clear existing data

        while (resultSet.next()) {
            String title = resultSet.getString("Title");
            String content = resultSet.getString("Content");
            String date = resultSet.getString("Date");
            tableModel.addRow(new Object[]{title, content, date});
        }

        resultSet.close();
        statement.close();
        connection.close();

        // After populating the table, select the first row if available
        if (ContentTable.getRowCount() > 0) {
            ContentTable.setRowSelectionInterval(0, 0);
        }
    } catch (Exception ex) {
        ex.printStackTrace();
    }
    }//GEN-LAST:event_txtsearchKeyReleased

    private void txtsearchActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtsearchActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtsearchActionPerformed

    private void ContentTableMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_ContentTableMouseClicked
        
    }//GEN-LAST:event_ContentTableMouseClicked
private JPopupMenu createPopupMenu(int selectedRow) {
    JPopupMenu popupMenu = new JPopupMenu();
//popupmenu creastion
    JMenuItem editMenuItem = new JMenuItem("Edit");
    editMenuItem.addActionListener(new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent event) {
            String content = tableModel.getValueAt(selectedRow, 1).toString();
            NoteArea.setText(content);
            NoteArea.setEditable(true); // Make NoteArea editable
        }
    });
    popupMenu.add(editMenuItem);

    JMenuItem deleteMenuItem = new JMenuItem("Delete");
deleteMenuItem.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent event) {
        int docID = rowIndexToDocIDMap.get(selectedRow);
        deleteNoteFromDatabase(docID);
        tableModel.removeRow(selectedRow); // Remove row from the table

        // Show a confirmation message
        JOptionPane.showMessageDialog(null, "Document deleted successfully!", "Document Deleted", JOptionPane.INFORMATION_MESSAGE);
    }
});
popupMenu.add(deleteMenuItem);

    JMenuItem saveMenuItem = new JMenuItem("Save");
saveMenuItem.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent event) {
        int docID = rowIndexToDocIDMap.get(selectedRow);
        String updatedContent = NoteArea.getText();
        saveNoteToDatabase(docID, updatedContent);

        // Show a confirmation message
        JOptionPane.showMessageDialog(null, "Document saved successfully!", "Document Saved", JOptionPane.INFORMATION_MESSAGE);
    }
});
popupMenu.add(saveMenuItem);

    return popupMenu;
}

// DeleteNoteFromDatabase method
private void deleteNoteFromDatabase(int docID) {
    try {
        Connection connection = DbConnection.dbConnect();
        String deleteQuery = "DELETE FROM Documents WHERE DocID = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(deleteQuery);
        preparedStatement.setInt(1, docID);
        preparedStatement.executeUpdate();
        preparedStatement.close();
        connection.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
}

// SaveNoteToDatabase method
private void saveNoteToDatabase(int docID, String updatedContent) {
    try {
        Connection connection = DbConnection.dbConnect();
        String updateQuery = "UPDATE Documents SET Content = ? WHERE DocID = ?";
        PreparedStatement preparedStatement = connection.prepareStatement(updateQuery);
        preparedStatement.setString(1, updatedContent);
        preparedStatement.setInt(2, docID);
        preparedStatement.executeUpdate();
        preparedStatement.close();
        connection.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
}

// Refresh operation
private void refreshTable() {
    // Clear existing data from the table
    DefaultTableModel tableModel = (DefaultTableModel) ContentTable.getModel();
    tableModel.setRowCount(0);

    try {
        Connection connection = DbConnection.dbConnect();
        Statement statement = connection.createStatement();
        String sqlQuery = "SELECT DocID, Title, Content, Date FROM Documents";
        ResultSet resultSet = statement.executeQuery(sqlQuery);

        while (resultSet.next()) {
            int docID = resultSet.getInt("DocID");
            String title = resultSet.getString("Title");
            String content = resultSet.getString("Content");
            String date = resultSet.getString("Date");
            tableModel.addRow(new Object[]{docID, title, content, date});
        }

        resultSet.close();
        statement.close();
        connection.close();
    } catch (Exception e) {
        e.printStackTrace();
    }

    // After populating the table, select the first row if available
    if (ContentTable.getRowCount() > 0) {
        ContentTable.setRowSelectionInterval(0, 0);
    }
}



    // OpenEditableTab method
    private void openEditableTab(String content) {
        // Your code for opening an editable tab goes here
    }
    
    public static void main(String args[]) {
       
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new Dashboard().setVisible(true);
                
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JTabbedPane Content;
    private javax.swing.JTable ContentTable;
    private javax.swing.JPanel DynaNotesGrid;
    private javax.swing.JTextArea NoteArea;
    private javax.swing.JPanel Upperpanel;
    private javax.swing.JButton btnaddnote;
    private javax.swing.JButton btncreatereport;
    private javax.swing.JButton btnrefresh;
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton2;
    private javax.swing.JButton jButton3;
    private javax.swing.JButton jButton4;
    private javax.swing.JButton jButton5;
    private javax.swing.JButton jButton7;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPopupMenu jPopupMenu1;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JTable jTable1;
    private javax.swing.JLabel lblsearch;
    private javax.swing.JTextField txtsearch;
    // End of variables declaration//GEN-END:variables
}
