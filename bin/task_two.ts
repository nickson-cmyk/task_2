#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TaskTwoStack } from '../lib/task_two-stack';

const app = new cdk.App();
new TaskTwoStack(app, 'TaskTwoStack');
