package com.spirovanni.blackshields.cucumber.stepdefs;

import com.spirovanni.blackshields.BridgeApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = BridgeApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
