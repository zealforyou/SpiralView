package com.zz.graphtest1;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.SeekBar;

public class MainActivity extends AppCompatActivity {

    private SeekBar seekBar;
    private D3View d3View1, d3View2, d3View3, d3View4, d3View5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        d3View1 = (D3View) findViewById(R.id.imageView1);
    }
}
